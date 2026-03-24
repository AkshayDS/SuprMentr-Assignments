// src/pages/About.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Reveal from '../components/Reveal';

const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How did Orphan Care Network start?",
      answer: "We started in 2012 when a group of passionate educators and social workers came together, recognizing the critical gap in personalized mentorship for children in institutional care."
    },
    {
      question: "Where do my donations go?",
      answer: "100% of our public donations go directly towards our core programs: educational materials, direct child sponsorship, and organizing community health camps."
    },
    {
      question: "Can I sponsor a specific child?",
      answer: "Yes! Our direct sponsorship program allows you to connect with a child, receive progress updates, and exchange approved letters so you can directly see your impact."
    }
  ];

  return (
    <div className="page about-page show-animate">
      <Reveal delay={0}>
        <div className="content-container">
          <h2 className="page-title">Our <span>Mission</span></h2>
          <p className="page-subtitle text-left ml-0">The Orphan Care Network is dedicated to transforming the lives of vulnerable children worldwide. We believe that robust community support and education are the foundational stepping stones for every child's success.</p>
          
          <blockquote className="mission-statement">
            "It takes a village to raise a child, but it takes a network of love to help them soar."
          </blockquote>
          
          <div className="grid-2 mt-4">
            <div>
              <h3 className="mb-2 text-primary font-bold text-xl">Our Vision</h3>
              <p className="text-muted">To see a world where no child is left behind due to a lack of familial support or resources.</p>
            </div>
            <div>
              <h3 className="mb-2 text-primary font-bold text-xl">Our Values</h3>
              <p className="text-muted">Compassion, Transparency, Empowerment, and Unwavering Commitment to the child's best interests.</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="content-container">
          <h2 className="page-title text-2xl">Frequently Asked <span>Questions</span></h2>
          <div className="faq-container mt-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                <button 
                  className="faq-question" 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                  {openFaq === index ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-muted" />}
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default About;
