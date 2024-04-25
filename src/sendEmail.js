
const sendEmail = async () => {
    try {
      // Generate the content string from kdStats
      const content = kdStats.map((player, index) => (
        `${index + 1}. ${player.name}, K/D: ${player.kd}, Level: ${player.level}, Games Played: ${player.matches}\n`
      )).join('\n');
  
      // Send POST request to server with content included
      const response = await fetch('http://localhost:3000/send-email', { // Change the URL to use port 3000
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          recipientEmail: 'mattemcbee@gmail.com',
          subject: 'Subject of the email',
          content: content // Include the content generated from kdStats
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  

  Trigger the email sending POST request here
        sendEmail();
        console.log('email sent')