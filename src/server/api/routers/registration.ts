import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendExamSubmission, sendRegistrationConfirmation, sendRegistrationWithoutExam } from "~/server/services/email";

// Simple in-memory storage for demo purposes
// In production, you would use a database
const registrations = new Map<string, any>();

export const registrationRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        examType: z.enum([
          "bac-mate-info",
          "admitere",
          "admitere-bac"
        ]),
        faculty: z.string().optional(),
        message: z.string().optional(),
        wantToTakeExam: z.boolean().optional().default(true),
      })
    )
    .mutation(async ({ input }) => {
      // Generate unique registration ID
      const registrationId = Math.random().toString(36).substr(2, 9);
      
      // Store registration data (in production, save to database)
      registrations.set(registrationId, {
        ...input,
        registrationDate: new Date(),
      });
      
      console.log("New registration:", input);
      
      // Always send registration notification to teacher
      try {
        if (input.wantToTakeExam) {
          // Send registration notification to teacher for students who want to take exam
          await sendRegistrationConfirmation(input, registrationId);
        } else {
          // Send registration notification to teacher for students who don't want to take exam  
          await sendRegistrationWithoutExam(input, registrationId);
        }
      } catch (error) {
        console.error("Failed to send registration notification:", error);
        // Continue anyway, don't fail the registration
      }
      
      return {
        success: true,
        message: input.wantToTakeExam 
          ? "Registration submitted successfully! You will be contacted soon with exam portal details."
          : "Registration submitted successfully! You will be contacted soon with session scheduling details.",
        registrationId,
        examType: input.examType,
        wantToTakeExam: input.wantToTakeExam,
      };
    }),

  submitExam: publicProcedure
    .input(
      z.object({
        registrationId: z.string(),
        solutionFile: z.string().nullable(),
        fileName: z.string().nullable(),
        timeSpent: z.number(), // seconds spent on exam
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Retrieve the original registration data
        const registrationData = registrations.get(input.registrationId);
        
        console.log("Exam submission:", {
          registrationId: input.registrationId,
          fileName: input.fileName,
          timeSpent: `${Math.floor(input.timeSpent / 60)} minutes ${input.timeSpent % 60} seconds`,
          fileSize: input.solutionFile ? `${(input.solutionFile.length / 1024 / 1024).toFixed(2)} MB` : "No file"
        });

        // Send email with exam submission and registration data
        await sendExamSubmission({
          registrationId: input.registrationId,
          registrationData,
          solutionFile: input.solutionFile,
          fileName: input.fileName,
          timeSpent: input.timeSpent,
        });
        
        return {
          success: true,
          message: "Exam submitted successfully! The solution has been sent to Rares Cotoi.",
        };
      } catch (error) {
        console.error("Error submitting exam:", error);
        throw new Error("Failed to submit exam. Please try again.");
      }
    }),
}); 