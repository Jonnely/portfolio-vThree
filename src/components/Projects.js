import { Col, Tab, Row, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import bdo from '../assets/img/bdo.jpg';
import konsultamd from '../assets/img/konsultamd.png';
import globe from '../assets/img/globe.png';
import manulife from '../assets/img/manulife.jpg';
import entrego from '../assets/img/entrego.png';
import coins from '../assets/img/coins.png';
import dcr from '../assets/img/dcr.png';
import bank_integ from '../assets/img/bpi_integ.png';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
    
    const novare = [
        {
            title: "BDO Personal Online Banking",
            imgUrl: bdo,
        },
        {
            title: "Konsulta MD",
            imgUrl: konsultamd,
        },
        {
            title: "Globe Workbench",
            imgUrl: globe,
        }
    ];

    const sunlife = [
        {
            title: "Bank API Integration",
            imgUrl: bank_integ,
        },
        {
            title: "COINS Collection Intake System",
            imgUrl: coins,
        },
        {
            title: "Daily Collections Reporting System",
            imgUrl: dcr,
        }
    ];

    const internalTools = [
        {
            title: "Manulife Internal Tools",
            imgUrl: manulife,
        },
        {
            title: "Entrego Shipping App",
            imgUrl: entrego,
        },
        {
            title: "PCCW Business Process Management",
            imgUrl: bdo,
        },
    ];

    return (
        <section className='project' id='projects'>
            <Row>
                <Col>
                    <h2>Projects</h2>
                    <TrackVisibility>
                        {({ isVisible }) => 
                        <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                            <p>Here are some of my recent projects showcasing my skills and expertise. These projects demonstrate my proficiency in various technologies and my ability to deliver high-quality solutions. I have worked on diverse applications ranging from banking systems to internal tools, each contributing to my growth as a developer.</p>
                        </div>}
                    </TrackVisibility>
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Novare Technologies</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Sunlife (Internal Projects)</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">More Internal Projects</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Row>
                                    {
                                        novare.map((project, index) => {
                                            return (
                                                <ProjectCard
                                                    key={index}
                                                    {...project}
                                                />
                                            );
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Row>
                                    {
                                        sunlife.map((project, index) => {
                                            return (
                                                <ProjectCard
                                                    key={index}
                                                    {...project}
                                                />
                                            );
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Row>
                                    {
                                        internalTools.map((project, index) => {
                                            return (
                                                <ProjectCard
                                                    key={index}
                                                    {...project}
                                                />
                                            );
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
        </section>
    );
}