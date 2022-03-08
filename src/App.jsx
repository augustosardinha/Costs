import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home/Home';
import Projects from './components/pages/Projects/Projects';
import About from './components/pages/About/About';
import NewProject from './components/pages/NewProject/NewProject';
import EditProject from './components/pages/EditProject/EditProject';

function App() {
    return (
        <Router>
            <Header />
            <Container customClass="minHeight">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/projects" element={<Projects />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/newproject" element={<NewProject />} />
                    <Route exact path="/project/:id" element={<EditProject />} />
                </Routes>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;
