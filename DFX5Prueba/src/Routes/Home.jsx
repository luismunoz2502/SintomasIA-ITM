import { IMAGE_URL } from "../../config";
import "../App.css";

export const Home = () => {
  return (
    <>
     

      <article className="contentHome">
        <img className="imageLogo" src={IMAGE_URL} alt="Logo App" />
        <h1>Cuida tu salud con IA</h1>
        <p className="description">
          Habla con nuestro asistente de voz inteligente. Convierte tu voz en texto
          y recibe respuestas inmediatas con inteligencia artificial. 
          Simple, rápido y sin complicaciones.
        </p>
        <a href="https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S0016-38132022001100017" target="_blank" rel="noreferrer">
          <button className="buttonLearMore">Comenzar</button>
        </a>
      </article>
    </>
  );
};
