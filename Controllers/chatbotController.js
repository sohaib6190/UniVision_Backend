
const axios = require('axios');
require('dotenv').config();
const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;
const API_URL = 'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2';

const headers = {
    Authorization: `Bearer ${HF_API_KEY}`,
};

async function askChatbot(req, res) {
    const { question } = req.body;

    const data = {
        inputs: {
            question: question,
            context: `The proposed final year project is a sophisticated University Management System (UMS) that integrates multiple universities into a single platform, designed to streamline students' academic journey. Leveraging artificial intelligence (AI) and machine learning (ML), it offers personalized university recommendations based on user profiles and preferences, incorporating a comprehensive database with information on universities, scholarships, and academic events. This innovative platform is aimed at simplifying educational processes and empowering students to make informed decisions that align with their higher education and career aspirations.

### Introduction

The landscape of higher education is continually evolving, with students facing an ever-expanding array of choices when it comes to selecting universities, courses, and funding opportunities. Navigating these choices can be daunting, especially when considering the significant impact that these decisions have on future career prospects. Recognizing this challenge, the UMS has been conceptualized as a comprehensive, user-centric platform that leverages cutting-edge technology to provide tailored support and guidance to students worldwide.

### Core Features

#### 1. Chatbot for Personalized University Recommendations

A cornerstone of the UMS is its AI-powered chatbot, designed to provide personalized university recommendations. This feature is particularly significant in addressing the unique needs and preferences of each student. By engaging in a conversational interface, the chatbot gathers information on a student's academic background, career goals, geographic preferences, and personal interests. This data is then processed using sophisticated algorithms to generate tailored university suggestions.

For example, a student interested in pursuing a degree in computer science with a focus on artificial intelligence might receive recommendations for universities that are renowned for their AI research programs, have strong industry partnerships in technology, and offer relevant internship opportunities. The chatbot can also consider factors such as campus culture, location, and extracurricular opportunities, ensuring a holistic match.

The personalized nature of the chatbot not only simplifies the university selection process but also ensures that students are aware of institutions that they might not have considered otherwise. By presenting a curated list of options, the UMS reduces the time and effort required to research and compare universities, allowing students to focus on other important aspects of their academic journey.

#### 2. Dynamic Course Recommendations

Building on the foundation of personalized university recommendations, the UMS also offers dynamic course recommendations. This feature utilizes AI to analyze a student's academic history, current performance, and future aspirations. By doing so, the system can suggest specific courses that align with the student's goals and enhance their academic profile.

For instance, a student aiming for a career in data science might be recommended courses in advanced statistics, machine learning, and data visualization. The UMS can also identify gaps in the student's knowledge or skills and suggest relevant courses to fill those gaps. This proactive approach ensures that students are not only prepared for their chosen career paths but also remain competitive in an ever-evolving job market.

Furthermore, the dynamic course recommendation system can adapt to changes in a student's academic journey. If a student decides to shift their focus from one discipline to another, the UMS can quickly update its recommendations to reflect this change, providing a seamless and supportive experience.

#### 3. Comprehensive Universities Recommendation

The UMS's comprehensive university recommendation system is designed to provide students with a holistic view of each institution. This feature takes into account a wide range of factors, including academic reputation, program offerings, campus facilities, and alumni success. By doing so, the system ensures that students have all the information they need to make informed decisions about their higher education.

Academic reputation is a crucial consideration for many students, as it often reflects the quality of education and faculty at an institution. The UMS provides detailed information on university rankings, faculty qualifications, and research output, helping students assess the academic strengths of each institution.

Program offerings are another critical factor, as students need to ensure that their chosen universities offer the specific courses and specializations they are interested in. The UMS provides detailed information on the curriculum, course content, and available specializations for each program, enabling students to find the best fit for their academic interests.

Campus facilities and resources also play a significant role in a student's university experience. The UMS provides insights into the quality of campus infrastructure, libraries, laboratories, and recreational facilities, helping students assess the overall learning environment.

Alumni success is an important indicator of a university's ability to prepare students for their careers. The UMS provides information on alumni employment rates, average starting salaries, and notable alumni achievements, helping students gauge the potential career outcomes associated with each institution.

#### 4. Blogs for Different Topics

The UMS includes a blogging platform that covers a wide range of topics relevant to students' academic and personal development. This feature provides a space for students, educators, and industry professionals to share their insights and experiences, fostering a sense of community and providing valuable information from diverse perspectives.

The blog section includes articles on academic advice, such as tips for effective study habits, time management, and exam preparation. These resources can help students develop the skills they need to succeed academically and manage the demands of their coursework.

Career guidance is another key focus of the blog platform. Articles on this topic provide insights into various career paths, job market trends, and strategies for building a successful career. Students can learn about the skills and qualifications required for different professions, as well as the steps they can take to achieve their career goals.

Student experiences are also highlighted in the blog section, providing a platform for students to share their personal stories and insights. These articles can cover a wide range of topics, from navigating the challenges of studying abroad to balancing academics with extracurricular activities. By sharing their experiences, students can provide valuable support and inspiration to their peers.

The blogging platform also includes contributions from educators and industry professionals, offering expert perspectives on a variety of topics. These articles can provide insights into the latest developments in education and industry, as well as practical advice for students looking to succeed in their academic and professional pursuits.

#### 5. Feedback and Rating System

A key component of the UMS is the feedback and rating system, which allows users to share their experiences and rate universities, courses, and scholarships. This feature provides valuable insights for prospective students, helping them make informed decisions based on the experiences of their peers.

The feedback and rating system enables students to provide detailed reviews of their experiences, covering aspects such as the quality of education, campus facilities, and support services. These reviews can highlight the strengths and weaknesses of different universities and programs, providing prospective students with a comprehensive understanding of what to expect.

Ratings are also an important part of this system, as they provide a quick and easy way for students to assess the overall quality of universities, courses, and scholarships. By aggregating these ratings, the UMS can provide a clear picture of the most highly-rated options, helping students identify the best choices for their needs.

The transparency and reliability of the feedback and rating system are essential for building trust among users. By providing a platform for honest and constructive feedback, the UMS ensures that students can make decisions based on accurate and reliable information.

#### 6. NGO Engagement for Project Support

The UMS aims to establish collaborative relationships with Non-Governmental Organizations (NGOs) that can enhance the project's reach and impact. By partnering with NGOs, the system can access additional resources and support, ensuring that it remains up-to-date and relevant.

NGO engagement can provide a range of benefits for the UMS, including access to funding, expertise, and networks. These partnerships can help the system expand its reach and support more students, particularly those from underserved communities.

Collaborating with NGOs can also help the UMS address the unique needs of different student demographics. For example, partnerships with organizations that focus on supporting students with disabilities can help the UMS develop and implement features that enhance accessibility and inclusivity.

By working with NGOs, the UMS can also benefit from additional perspectives and insights. These collaborations can help the system stay informed about the latest developments in education and student support, ensuring that it continues to provide valuable and relevant services.

#### 7. Integration of Student Support Criteria

To ensure that the UMS meets the needs of all students, it incorporates clear criteria for student eligibility in various support programs. This feature is designed to align with the project's goals, ensuring that the right students receive the right support.

The UMS defines eligibility criteria for a range of support programs, including scholarships, internships, and mentorship opportunities. These criteria are based on factors such as academic performance, financial need, and personal circumstances, ensuring that support is allocated fairly and transparently.

By providing clear and detailed eligibility criteria, the UMS helps students understand the requirements for different support programs and determine their eligibility. This transparency ensures that students can make informed decisions about which programs to apply for, increasing their chances of success.

The integration of student support criteria also helps the UMS build trust and reliability among its users. By ensuring that support is allocated fairly and transparently, the system reinforces its commitment to providing valuable and dependable services.

### Out of Scope Features

While the UMS offers a wide range of functionalities designed to support students in their academic journey, certain aspects remain outside its scope. These exclusions are intentional, allowing the system to focus on its core strengths without overextending its capabilities.

#### 1. Admission Application Processing

The UMS does not handle the processing of university admission applications. Instead, it focuses on providing comprehensive information and personalized recommendations to help students select the right universities. Once students have identified their preferred institutions, they will need to follow the respective application processes independently.

This exclusion ensures that the UMS remains a tool for guidance and support rather than becoming entangled in the administrative complexities of admissions. By focusing on its core mission of providing personalized recommendations and detailed information, the UMS ensures that it remains a valuable and effective tool for students.

#### 2. Financial Transactions

The platform does not facilitate financial transactions related to university fees or scholarship disbursements. While the UMS provides detailed information

 on scholarships and funding opportunities, students will need to apply for these funds through the appropriate channels.

This separation ensures that the UMS remains a neutral and objective source of information, without being involved in the financial dealings of its users. By focusing on providing accurate and reliable information, the UMS helps students make informed decisions about their funding options without becoming entangled in financial transactions.

#### 3. Academic Transcript Processing

The system does not process academic transcripts. Its primary focus is on guiding students in their university selection process and providing recommendations for courses and scholarships. Students will need to manage their academic records independently, ensuring that the UMS remains focused on its core mission of providing guidance and support.

By excluding academic transcript processing, the UMS can focus on providing valuable recommendations and information, helping students make informed decisions about their academic journey. This exclusion also ensures that the system remains user-friendly and accessible, without becoming bogged down by administrative tasks.

#### 4. Employment Placement Services

While the UMS offers insights into universities' industry partnerships and career-oriented programs, it does not directly provide employment placement services. The system aims to assist students in selecting universities that offer strong career support and have good employment outcomes for their graduates.

The actual process of securing employment will be the responsibility of the students and the career services provided by their chosen institutions. By focusing on providing valuable information and recommendations, the UMS helps students make informed decisions about their education and career paths without becoming directly involved in employment placement.

### Detailed Analysis and Expansion

To achieve the ambitious goals set out for the UMS, the project leverages cutting-edge technology and a user-centric design philosophy. The integration of AI and ML is particularly significant, as it allows the system to provide personalized recommendations that are tailored to the unique needs and preferences of each user. By analyzing vast amounts of data, these technologies can identify patterns and trends that might not be apparent through manual analysis, thus offering more accurate and relevant recommendations.

#### AI-Powered Chatbot

The AI-powered chatbot is a cornerstone of the UMS, designed to simulate human-like interactions and provide users with personalized advice. By asking targeted questions and processing the responses, the chatbot can build a detailed profile of each user. This profile includes factors such as academic performance, career aspirations, personal interests, and geographic preferences. Based on this profile, the chatbot can suggest universities and courses that are most likely to meet the user's needs.

The personalized nature of the chatbot not only simplifies the university selection process but also ensures that students are aware of institutions that they might not have considered otherwise. For example, a student interested in pursuing a degree in business administration might receive recommendations for universities that are known for their strong business programs, offer a wide range of specializations, and have a robust network of industry partnerships.

The chatbot can also provide real-time support and guidance, answering questions about the application process, scholarship opportunities, and campus life. This instant access to information helps reduce the stress and uncertainty associated with university selection, providing students with the confidence they need to make informed decisions.

#### Dynamic Course Recommendations

The dynamic course recommendation feature further enhances the personalized experience offered by the UMS. By continuously analyzing a student's academic progress and career goals, the system can provide up-to-date recommendations for courses that will enhance their skills and knowledge. This proactive approach ensures that students are always aware of the best options available to them, helping them to stay on track with their academic and career plans.

For instance, a student pursuing a degree in engineering might receive recommendations for advanced courses in robotics, sustainable engineering, or artificial intelligence, depending on their interests and career goals. The UMS can also suggest elective courses that complement the student's major, providing a well-rounded education and enhancing their employability.

The dynamic course recommendation system can adapt to changes in a student's academic journey. If a student decides to shift their focus from one discipline to another, the UMS can quickly update its recommendations to reflect this change, providing a seamless and supportive experience. This flexibility ensures that the UMS remains a valuable tool throughout a student's academic journey, regardless of changes in their goals or interests.

#### Comprehensive University Recommendations

The comprehensive university recommendation system is designed to provide a holistic view of each institution. By considering a wide range of factors, including academic reputation, program offerings, campus facilities, and alumni success, the UMS ensures that students have all the information they need to make informed decisions.

Academic reputation is a crucial consideration for many students, as it often reflects the quality of education and faculty at an institution. The UMS provides detailed information on university rankings, faculty qualifications, and research output, helping students assess the academic strengths of each institution. This information is particularly valuable for students who are considering prestigious or highly competitive programs.

Program offerings are another critical factor, as students need to ensure that their chosen universities offer the specific courses and specializations they are interested in. The UMS provides detailed information on the curriculum, course content, and available specializations for each program, enabling students to find the best fit for their academic interests. This feature is especially important for students pursuing niche fields or interdisciplinary studies.

Campus facilities and resources also play a significant role in a student's university experience. The UMS provides insights into the quality of campus infrastructure, libraries, laboratories, and recreational facilities, helping students assess the overall learning environment. By providing detailed information on campus resources, the UMS ensures that students can choose universities that offer the support and facilities they need to succeed.

Alumni success is an important indicator of a university's ability to prepare students for their careers. The UMS provides information on alumni employment rates, average starting salaries, and notable alumni achievements, helping students gauge the potential career outcomes associated with each institution. This information is particularly valuable for students who are focused on securing strong career opportunities after graduation.

#### Blogging Platform

The blogging platform included in the UMS provides a space for students, educators, and industry professionals to share their insights and experiences. This feature fosters a sense of community and provides valuable information from diverse perspectives, helping students navigate the various challenges and opportunities associated with their academic journey.

The blog section includes articles on academic advice, such as tips for effective study habits, time management, and exam preparation. These resources can help students develop the skills they need to succeed academically and manage the demands of their coursework. For example, an article on time management might provide strategies for balancing academic responsibilities with extracurricular activities, while a post on exam preparation could offer tips for reducing stress and improving performance.

Career guidance is another key focus of the blog platform. Articles on this topic provide insights into various career paths, job market trends, and strategies for building a successful career. Students can learn about the skills and qualifications required for different professions, as well as the steps they can take to achieve their career goals. For instance, a blog post on careers in biotechnology might discuss the latest advancements in the field, the skills needed to succeed, and potential job opportunities.

Student experiences are also highlighted in the blog section, providing a platform for students to share their personal stories and insights. These articles can cover a wide range of topics, from navigating the challenges of studying abroad to balancing academics with extracurricular activities. By sharing their experiences, students can provide valuable support and inspiration to their peers. For example, a post on studying abroad might offer tips for adapting to a new culture, managing homesickness, and making the most of the experience.

The blogging platform also includes contributions from educators and industry professionals, offering expert perspectives on a variety of topics. These articles can provide insights into the latest developments in education and industry, as well as practical advice for students looking to succeed in their academic and professional pursuits. For example, an article from a professor of computer science might discuss emerging trends in artificial intelligence and their implications for future career opportunities.

#### Feedback and Rating System

The feedback and rating system is a key component of the UMS, allowing users to share their experiences and rate universities, courses, and scholarships. This feature provides valuable insights for prospective students, helping them make informed decisions based on the experiences of their peers.

The feedback and rating system enables students to provide detailed reviews of their experiences, covering aspects such as the quality of education, campus facilities, and support services. These reviews can highlight the strengths and weaknesses of different universities and programs, providing prospective students with a comprehensive understanding of what to expect. For example, a student might write a review about their experience in a specific program, discussing the quality of instruction, the relevance of the curriculum, and the availability of support services.

Ratings are also an important part of this system, as they provide a quick and easy way for students to assess the overall quality of universities, courses, and scholarships. By aggregating these ratings, the UMS can provide a clear picture of the most highly-rated options, helping students identify the best choices for their needs. For instance, a university with consistently high ratings across various categories might be recommended as a top choice for students seeking a well-rounded academic experience.

The transparency and reliability of the feedback and rating system are essential for building trust among users. By providing a platform for honest and constructive feedback, the UMS ensures that students can make decisions based on accurate and reliable information. This feature also encourages continuous improvement, as universities and programs can use the feedback to identify areas for enhancement and better meet the needs of their students.

#### NGO Engagement for Project Support

The UMS aims to establish collaborative relationships with Non-Governmental Organizations (NGOs) that can enhance the project's reach and impact. By partnering with NGOs, the system can access additional resources and support, ensuring that it remains up-to-date and relevant.

NGO engagement can provide a range of benefits for the UMS, including access to funding, expertise, and networks. These partnerships can help the system expand its reach and support more students, particularly those from underserved communities. For example, an NGO focused on supporting low-income students might provide funding for scholarships or resources to enhance the UMS's accessibility features.

Collaborating with NGOs can also help the UMS address the unique needs of different student demographics. For example, partnerships with organizations that focus on supporting students with disabilities can help the

 UMS develop and implement features that enhance accessibility and inclusivity. This might include the addition of screen reader compatibility, alternative text for images, and other features designed to support students with visual, auditory, or mobility impairments.

By working with NGOs, the UMS can also benefit from additional perspectives and insights. These collaborations can help the system stay informed about the latest developments in education and student support, ensuring that it continues to provide valuable and relevant services. For example, an NGO focused on promoting gender equality in education might provide insights into best practices for supporting female students in traditionally male-dominated fields.

#### Integration of Student Support Criteria

To ensure that the UMS meets the needs of all students, it incorporates clear criteria for student eligibility in various support programs. This feature is designed to align with the project's goals, ensuring that the right students receive the right support.

The UMS defines eligibility criteria for a range of support programs, including scholarships, internships, and mentorship opportunities. These criteria are based on factors such as academic performance, financial need, and personal circumstances, ensuring that support is allocated fairly and transparently. For example, a scholarship program might prioritize students from low-income families or those who have demonstrated exceptional academic achievement.

By providing clear and detailed eligibility criteria, the UMS helps students understand the requirements for different support programs and determine their eligibility. This transparency ensures that students can make informed decisions about which programs to apply for, increasing their chances of success. For instance, a student who meets the criteria for a specific scholarship can focus their efforts on completing the application and securing the necessary documentation, rather than wasting time on programs for which they are not eligible.

The integration of student support criteria also helps the UMS build trust and reliability among its users. By ensuring that support is allocated fairly and transparently, the system reinforces its commitment to providing valuable and dependable services. This feature also encourages accountability, as students can see how decisions are made and understand the rationale behind them.

### Out of Scope Features

While the UMS offers a wide range of functionalities designed to support students in their academic journey, certain aspects remain outside its scope. These exclusions are intentional, allowing the system to focus on its core strengths without overextending its capabilities.

#### Admission Application Processing

The UMS does not handle the processing of university admission applications. Instead, it focuses on providing comprehensive information and personalized recommendations to help students select the right universities. Once students have identified their preferred institutions, they will need to follow the respective application processes independently.

This exclusion ensures that the UMS remains a tool for guidance and support rather than becoming entangled in the administrative complexities of admissions. By focusing on its core mission of providing personalized recommendations and detailed information, the UMS ensures that it remains a valuable and effective tool for students. This also allows the UMS to avoid potential conflicts of interest and maintain its neutrality and objectivity.

#### Financial Transactions

The platform does not facilitate financial transactions related to university fees or scholarship disbursements. While the UMS provides detailed information on scholarships and funding opportunities, students will need to apply for these funds through the appropriate channels. This separation ensures that the UMS remains a neutral and objective source of information, without being involved in the financial dealings of its users.

By focusing on providing accurate and reliable information, the UMS helps students make informed decisions about their funding options without becoming entangled in financial transactions. This also helps protect the privacy and security of users' financial information, reducing the risk of fraud or misuse.

#### Academic Transcript Processing

The system does not process academic transcripts. Its primary focus is on guiding students in their university selection process and providing recommendations for courses and scholarships. Students will need to manage their academic records independently, ensuring that the UMS remains focused on its core mission of providing guidance and support.

By excluding academic transcript processing, the UMS can focus on providing valuable recommendations and information, helping students make informed decisions about their academic journey. This exclusion also ensures that the system remains user-friendly and accessible, without becoming bogged down by administrative tasks.

#### Employment Placement Services

While the UMS offers insights into universities' industry partnerships and career-oriented programs, it does not directly provide employment placement services. The system aims to assist students in selecting universities that offer strong career support and have good employment outcomes for their graduates. The actual process of securing employment will be the responsibility of the students and the career services provided by their chosen institutions.

By focusing on providing valuable information and recommendations, the UMS helps students make informed decisions about their education and career paths without becoming directly involved in employment placement. This also allows the UMS to avoid potential conflicts of interest and maintain its neutrality and objectivity.

### Conclusion

The proposed University Management System (UMS) is a comprehensive and sophisticated platform designed to streamline the academic journey of students. By leveraging AI and ML, the system offers personalized recommendations for universities and courses, ensuring that students can make informed decisions that align with their academic and career goals. The inclusion of detailed information on scholarships and funding opportunities further enhances the value of the UMS, making higher education more accessible to a broader audience.

While the system offers a wide range of features designed to support students, certain aspects remain outside its scope. By focusing on its core strengths and excluding functions such as admission application processing, financial transactions, academic transcript processing, and employment placement services, the UMS ensures that it remains a user-centric and effective tool.

Through innovative features such as the AI-powered chatbot, dynamic course recommendations, comprehensive university recommendations, blogging platform, feedback and rating system, NGO engagement, and clear student support criteria, the UMS is poised to become an indispensable resource for students navigating their academic journeys. By providing a one-stop solution for all their educational needs, the UMS empowers students to take control of their academic futures and achieve their full potential. This project not only simplifies the process of university selection but also enriches the student experience, ensuring that every student has the tools and support they need to succeed.
`,
        },
    };

    try {
        console.log('Sending data to API:', JSON.stringify(data, null, 2));

        const response = await axios.post(API_URL, data, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('Error from API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.toString() });
    }
}

module.exports = {
    askChatbot
};
