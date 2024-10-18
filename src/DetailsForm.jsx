import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

function DetailsForm() {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  // Helper function to generate a random 10-figure number
  const generateUserNo = () => {
    const randomNo = Math.floor(1000000000 + Math.random() * 9000000000); // 10 digits
    return `user${randomNo}`;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setMessage(''); // Clear previous messages

    // Add the generated user_no to the form data
    form.current.user_no.value = generateUserNo();

    emailjs.sendForm(
      'service_nju2ql4', //Service_ID
      'template_klfpvy6', //Template_ID
      form.current,
      'DjX0sY8lUe-tfOMFl', //Public Key
    )
      .then((response) => {
        setMessage('Email sent successfully!');
        setSending(false);
      })
      .catch((err) => {
        setMessage('Failed to send email. Please try again.');
        setSending(false);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Get in Touch</h2>
      <form ref={form} onSubmit={sendEmail}>
        
        {/* Hidden input to store the generated user number */}
        <input type="hidden" name="user_no" />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="user_name"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="user_email"
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            name="message"
            placeholder="Your message..."
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
    </div>
  );
}

export default DetailsForm;
