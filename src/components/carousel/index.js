import Carousel from 'react-bootstrap/Carousel';
import React, {useState} from 'react';
import './carousel.css';
import img1 from '../../assets/Arara-azul.jpg';
import img2 from '../../assets/mico-leao-dourado.jpg';
import img3 from '../../assets/onça-pintada.jpg';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img className="d-block w-100" src={img1} alt="First slide"/>
          <Carousel.Caption>
            <h3>Arara Azul</h3>
            <p>Classificada como vulnerável na Lista Vermelha de Espécies Ameaçadas, da União Internacional para a Conservação da Natureza e dos Recursos Naturais (IUCN)</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={img2} alt="Second slide" />
          <Carousel.Caption>
            <h3>Mico Leão Dourado</h3>
            <p>Segundo a "Lista Nacional Oficial de Espécies da Fauna Ameaçadas de Extinção”, o mico-leão-dourado encontra-se em perigo de extinção (EN). Também está incluído na lista vermelha do IUCN.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={img3} alt="Third slide" />
          <Carousel.Caption>
            <h3>Onça Pintada</h3>
            <p>No Brasil essa espécie é considerada “vulnerável”. De acordo com a IUCN (União Internacional para a Conservação da Natureza), ela pertence à categoria "quase ameaçada" de extinção.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
  export default ControlledCarousel;