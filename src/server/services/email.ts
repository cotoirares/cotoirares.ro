import nodemailer from "nodemailer";
import { env } from "~/env";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  examType: string;
  faculty?: string;
  message?: string;
  wantToTakeExam?: boolean;
}

interface ExamSubmission {
  registrationId: string;
  registrationData?: RegistrationData;
  solutionFile?: string | null;
  fileName?: string | null;
  timeSpent: number;
}

// Create transporter for domain email
const createTransporter = () => {
  // Check if email credentials are properly configured
  if (!env.EMAIL_USER || !env.EMAIL_PASS || !env.TEACHER_EMAIL || !env.SMTP_HOST) {
    throw new Error('Email credentials not configured');
  }
  
  const port = parseInt(env.SMTP_PORT || '587');
  const secure = env.SMTP_SECURE === 'true' || port === 465;
  
  console.log(`📧 Configuring SMTP: ${env.SMTP_HOST}:${port} (secure: ${secure})`);
  
  // Generic SMTP configuration for domain emails
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: port,
    secure: secure, // true for 465, false for other ports
    auth: {
      user: env.EMAIL_USER, // your domain email
      pass: env.EMAIL_PASS, // your domain email password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const sendExamSubmission = async (examData: ExamSubmission) => {
  // Fallback: Save to console if email fails
  const saveSubmissionLocally = () => {
    const submissionData = {
      timestamp: new Date().toISOString(),
      registrationId: examData.registrationId,
      studentName: `${examData.registrationData?.firstName} ${examData.registrationData?.lastName}`,
      email: examData.registrationData?.email,
      phone: examData.registrationData?.phone,
      examType: examData.registrationData?.examType,
      faculty: examData.registrationData?.faculty,
      message: examData.registrationData?.message,
      timeSpent: `${Math.floor(examData.timeSpent / 60)} minute(s) ${examData.timeSpent % 60} secunde`,
      fileName: examData.fileName,
      fileSize: examData.solutionFile ? `${(examData.solutionFile.length / 1024 / 1024).toFixed(2)} MB` : 'No file',
    };
    
    console.log('\n🎓 =======  EXAM SUBMISSION  ======= 🎓');
    console.log('📋 Student Info:');
    console.log(`   Name: ${submissionData.studentName}`);
    console.log(`   Email: ${submissionData.email}`);
    console.log(`   Phone: ${submissionData.phone}`);
    console.log(`   Exam Type: ${submissionData.examType}`);
    if (submissionData.faculty) console.log(`   Faculty: ${submissionData.faculty}`);
    if (submissionData.message) console.log(`   Message: ${submissionData.message}`);
    console.log('\n⏱️ Exam Details:');
    console.log(`   Registration ID: ${submissionData.registrationId}`);
    console.log(`   Time Spent: ${submissionData.timeSpent}`);
    console.log(`   File: ${submissionData.fileName || 'No file uploaded'}`);
    console.log(`   Size: ${submissionData.fileSize}`);
    console.log(`   Submitted: ${submissionData.timestamp}`);
    console.log('🎓 =============================== 🎓\n');
    
    return submissionData;
  };

  try {
    const transporter = createTransporter();
    
    const timeSpentFormatted = `${Math.floor(examData.timeSpent / 60)} minute${Math.floor(examData.timeSpent / 60) !== 1 ? 's' : ''} și ${examData.timeSpent % 60} secunde`;
    
    // Email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D97706 0%, #1E40AF 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🎓 Nouă Submisie Examen - Zece la Mate</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #D97706; margin-bottom: 20px;">📝 Detalii Student</h2>
          <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #D97706;">
            <p><strong>Nume:</strong> ${examData.registrationData?.firstName || 'N/A'} ${examData.registrationData?.lastName || 'N/A'}</p>
            <p><strong>Email:</strong> ${examData.registrationData?.email || 'N/A'}</p>
            <p><strong>Telefon:</strong> ${examData.registrationData?.phone || 'N/A'}</p>
            ${examData.registrationData?.faculty ? `<p><strong>Facultate:</strong> ${examData.registrationData.faculty}</p>` : ''}
            <p><strong>Tip Examen:</strong> ${examData.registrationData?.examType || 'N/A'}</p>
            ${examData.registrationData?.message ? `<p><strong>Mesaj:</strong> ${examData.registrationData.message}</p>` : ''}
          </div>
          
          <h2 style="color: #1E40AF; margin-bottom: 20px;">⏱️ Detalii Examen</h2>
          <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #1E40AF;">
            <p><strong>ID Înregistrare:</strong> ${examData.registrationId}</p>
            <p><strong>Timp Petrecut:</strong> ${timeSpentFormatted}</p>
            <p><strong>Fișier Soluție:</strong> ${examData.fileName || 'Nu a fost încărcat niciun fișier'}</p>
            <p><strong>Data Submisiei:</strong> ${new Date().toLocaleString('ro-RO')}</p>
          </div>
          
          ${examData.solutionFile ? `
            <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; border-left: 4px solid #059669;">
              <h3 style="color: #059669; margin-top: 0;">✅ Soluție Atașată</h3>
              <p>Studentul a încărcat fișierul <strong>${examData.fileName}</strong> cu soluția sa.</p>
              <p style="font-size: 12px; color: #666;">Fișierul este atașat acestui email.</p>
            </div>
          ` : `
            <div style="background: #fef3cd; padding: 20px; border-radius: 10px; border-left: 4px solid #F59E0B;">
              <h3 style="color: #F59E0B; margin-top: 0;">⚠️ Fără Soluție</h3>
              <p>Studentul nu a încărcat niciun fișier cu soluția.</p>
            </div>
          `}
        </div>
        
        <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">📧 Email trimis automat de platforma Zece la Mate</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: env.EMAIL_USER,
      to: env.TEACHER_EMAIL, // Your email to receive submissions
      subject: `📋 Nouă Submisie Examen - ${examData.registrationData?.firstName} ${examData.registrationData?.lastName}`,
      html: htmlContent,
      attachments: examData.solutionFile ? [
        {
          filename: examData.fileName || 'solutie-examen.pdf',
          content: examData.solutionFile.split(',')[1], // Remove data:application/pdf;base64, prefix
          encoding: 'base64'
        }
      ] : []
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Fallback to local logging if email fails
    console.log('📧 Email failed, saving submission locally...');
    const submission = saveSubmissionLocally();
    
    // Don't throw error, return success with local save
    return { 
      success: true, 
      messageId: 'local-save', 
      message: 'Email not configured - submission saved locally',
      localSubmission: submission 
    };
  }
};

export const sendRegistrationConfirmation = async (registrationData: RegistrationData, registrationId: string) => {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D97706 0%, #1E40AF 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">📚 Nouă Înregistrare - Zece la Mate</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #D97706; margin-bottom: 20px;">👤 Detalii Student</h2>
          <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #D97706;">
            <p><strong>Nume:</strong> ${registrationData.firstName} ${registrationData.lastName}</p>
            <p><strong>Email:</strong> ${registrationData.email}</p>
            <p><strong>Telefon:</strong> ${registrationData.phone}</p>
            <p><strong>Tip Examen:</strong> ${registrationData.examType}</p>
            ${registrationData.faculty ? `<p><strong>Facultate:</strong> ${registrationData.faculty}</p>` : ''}
            ${registrationData.message ? `<p><strong>Mesaj:</strong> ${registrationData.message}</p>` : ''}
          </div>
          
          <h2 style="color: #1E40AF; margin-bottom: 20px;">📝 Detalii Înregistrare</h2>
          <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #1E40AF;">
            <p><strong>ID Înregistrare:</strong> ${registrationId}</p>
            <p><strong>Data Înregistrării:</strong> ${new Date().toLocaleString('ro-RO')}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; border-left: 4px solid #059669;">
            <h3 style="color: #059669; margin-top: 0;">✅ Statusul Examenului</h3>
            <p><strong>Studentul VREA să susțină testul de evaluare acum.</strong></p>
            <p>Elevul va fi redirecționat către pagina de examen după completarea formularului.</p>
          </div>
        </div>
        
        <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">📧 Email trimis automat de platforma Zece la Mate</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: env.EMAIL_USER,
      to: env.TEACHER_EMAIL, // Send to teacher instead of student
      subject: `📚 Nouă Înregistrare (Cu Examen) - ${registrationData.firstName} ${registrationData.lastName}`,
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Registration notification (with exam) sent to teacher:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending registration notification:', error);
    console.log('📧 Registration notification not sent - email not configured properly');
    // Don't throw error for confirmation emails, just log it
    return { success: false, error: error };
  }
};

export const sendRegistrationWithoutExam = async (registrationData: RegistrationData, registrationId: string) => {
  // Fallback: Save to console if email fails
  const saveRegistrationLocally = () => {
    const registrationInfo = {
      timestamp: new Date().toISOString(),
      registrationId: registrationId,
      studentName: `${registrationData.firstName} ${registrationData.lastName}`,
      email: registrationData.email,
      phone: registrationData.phone,
      examType: registrationData.examType,
      faculty: registrationData.faculty,
      message: registrationData.message,
      wantToTakeExam: false,
    };
    
    console.log('\n📚 ====== REGISTRATION WITHOUT EXAM ====== 📚');
    console.log('👤 Student Info:');
    console.log(`   Name: ${registrationInfo.studentName}`);
    console.log(`   Email: ${registrationInfo.email}`);
    console.log(`   Phone: ${registrationInfo.phone}`);
    console.log(`   Exam Type: ${registrationInfo.examType}`);
    if (registrationInfo.faculty) console.log(`   Faculty: ${registrationInfo.faculty}`);
    if (registrationInfo.message) console.log(`   Message: ${registrationInfo.message}`);
    console.log('\n📝 Registration Details:');
    console.log(`   Registration ID: ${registrationInfo.registrationId}`);
    console.log(`   Exam Status: Student chose NOT to take exam now`);
    console.log(`   Registered: ${registrationInfo.timestamp}`);
    console.log('📚 ========================================= 📚\n');
    
    return registrationInfo;
  };

  try {
    const transporter = createTransporter();
    
    // Email content for teacher
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D97706 0%, #1E40AF 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">📚 Nouă Înregistrare - Zece la Mate</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #D97706; margin-bottom: 20px;">👤 Detalii Student</h2>
          <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #D97706;">
            <p><strong>Nume:</strong> ${registrationData.firstName} ${registrationData.lastName}</p>
            <p><strong>Email:</strong> ${registrationData.email}</p>
            <p><strong>Telefon:</strong> ${registrationData.phone}</p>
            <p><strong>Tip Examen:</strong> ${registrationData.examType}</p>
            ${registrationData.faculty ? `<p><strong>Facultate:</strong> ${registrationData.faculty}</p>` : ''}
            ${registrationData.message ? `<p><strong>Mesaj:</strong> ${registrationData.message}</p>` : ''}
          </div>
          
          <h2 style="color: #1E40AF; margin-bottom: 20px;">📝 Detalii Înregistrare</h2>
          <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #1E40AF;">
            <p><strong>ID Înregistrare:</strong> ${registrationId}</p>
            <p><strong>Data Înregistrării:</strong> ${new Date().toLocaleString('ro-RO')}</p>
          </div>
          
          <div style="background: #fef3cd; padding: 20px; border-radius: 10px; border-left: 4px solid #F59E0B;">
            <h3 style="color: #F59E0B; margin-top: 0;">⚠️ Statusul Examenului</h3>
            <p><strong>Studentul a ales să NU susțină testul de evaluare acum.</strong></p>
            <p>Elevul va trebui contactat pentru planificarea sesiunilor de pregătire fără a fi nevoie să susțină mai întâi testul de evaluare.</p>
          </div>
        </div>
        
        <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">📧 Email trimis automat de platforma Zece la Mate</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: env.EMAIL_USER,
      to: env.TEACHER_EMAIL, // Teacher's email to receive registrations
      subject: `📚 Nouă Înregistrare (Fără Examen) - ${registrationData.firstName} ${registrationData.lastName}`,
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Registration without exam email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending registration without exam email:', error);
    
    // Fallback to local logging if email fails
    console.log('📧 Email failed, saving registration locally...');
    const registration = saveRegistrationLocally();
    
    // Don't throw error, return success with local save
    return { 
      success: true, 
      messageId: 'local-save', 
      message: 'Email not configured - registration saved locally',
      localRegistration: registration 
    };
  }
}; 