import { Col, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useState, useEffect, useRef } from 'react';
import colorSharp from '../assets/img/color-sharp.png';

export const Skills = () => {
    const skills = [
        { name: 'Frontend Development', percentage: 50 },
        { name: 'Backend Development', percentage: 85 },
        { name: 'API Development', percentage: 80 },
        { name: 'JavaScript', percentage: 55 },
        { name: 'React', percentage: 34 },
        { name: 'Node.js', percentage: 55 },
        { name: 'SQL', percentage: 60 },
        { name: 'Git', percentage: 90 },
    ];

    const [animatedPercentages, setAnimatedPercentages] = useState(skills.map(() => 0));
    const [displayPercentages, setDisplayPercentages] = useState(skills.map(() => 0));
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        const timers = skills.map((skill, index) => {
                            return setTimeout(() => {
                                // Start progress animation
                                setAnimatedPercentages(prev => {
                                    const newArr = [...prev];
                                    newArr[index] = skill.percentage;
                                    return newArr;
                                });
                                
                                // Start number counting animation
                                let current = 0;
                                const increment = skill.percentage / 50; // 50 steps for smooth animation
                                const counterInterval = setInterval(() => {
                                    current += increment;
                                    if (current >= skill.percentage) {
                                        current = skill.percentage;
                                        clearInterval(counterInterval);
                                    }
                                    setDisplayPercentages(prev => {
                                        const newArr = [...prev];
                                        newArr[index] = Math.round(current);
                                        return newArr;
                                    });
                                }, 20); // 20ms for 1 second total
                                
                            }, index * 200); // stagger animation
                        });
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated, skills]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1
        }
    }

    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    return (
        <section className='skill' id='skills' ref={sectionRef}>
            <Row>
                <Col>
                    <div className="skill-bx">
                        <h2>Skills</h2>
                        <p>Here are some of my technical skills and proficiencies.</p>
                        <Carousel responsive={responsive} infinite={true} className="skill-slider">
                            {skills.map((skill, index) => {
                                const offset = circumference * (1 - animatedPercentages[index] / 100);
                                return (
                                    <div key={index} className='item'>
                                        <svg className="circular-progress" width="180" height="180">
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#AA367C" />
                                                    <stop offset="100%" stopColor="#4A2FBD" />
                                                </linearGradient>
                                            </defs>
                                            <circle cx="90" cy="90" r={radius} stroke="#333" strokeWidth="25" fill="none" />
                                            <circle
                                                cx="90"
                                                cy="90"
                                                r={radius}
                                                stroke="url(#gradient)"
                                                strokeWidth="25"
                                                fill="none"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={offset}
                                                strokeLinecap="round"
                                                className="progress-circle"
                                            />
                                        </svg>
                                        <h5>{skill.name} {displayPercentages[index]}%</h5>
                                    </div>
                                );
                            })}
                        </Carousel>
                    </div>
                </Col>
            </Row>
            {/* <img className='background-image-left' src={colorSharp} alt="Background" /> */}
        </section>
    );
}