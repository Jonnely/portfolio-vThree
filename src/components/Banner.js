import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { ArrowRightCircle } from 'react-bootstrap-icons';
// import restingPlanet from '../assets/img/resting.png';
// import restingPlanet from '../assets/img/rester.png';
import restingPlanet from '../assets/img/rester_2.png';
// import restingPlanet from '../assets/img/header-img.svg';

export const Banner = () => {

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["Software Engineer", "Java Developer", "Web Developer"];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(100 - Math.random() * 50);
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker)};
    }, [text]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
        setText(updatedText);

        if (isDeleting) {
            setDelta(50);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(200);
        }
    }

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to My Portfolio</span>
                        <h1>{`Hi, I'm Jonnel, `}<span className="wrap">{text}</span></h1>
                        <p>I am a passionate full stack Software Engineer with experience in building dynamic and responsive web applications. I love coding and continuously learning new technologies to enhance my skills.</p>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img className="img-header" src={restingPlanet} alt="Resting Planet" />
                    </Col>
                </Row>
            </Container>
        </section>
    )

}