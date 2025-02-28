import styled from 'styled-components';
import { FaPaw } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import PosteosRecientes from '../../componentes/posteosRecientes/PosteosRecientes';
import DogsHeader from '../../assets/GrupoDos.png';
import { ButtonComponent } from '../../componentes/buttom/Button';
import useFetch from '../../customHooks/useFetch';
import {
  SVGWavesInferior,
  SVGWavesSuperior,
} from '../../componentes/SVGWaves/SVGWaves';

const HeaderWrapper = styled.div`
  background: var(--clr-pink);
  background: radial-gradient(
    circle,
    rgba(247, 142, 150, 0.5) 0%,
    var(--clr-pink) 55%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
  padding: 1rem;
  @media screen and (min-width: 1000px) {
    padding: 3rem 8rem;
  }
  @media screen and (min-width: 1200px) {
    background: radial-gradient(
      circle,
      rgba(247, 142, 150, 0.5) 0%,
      var(--clr-pink) 22%
    );
    flex-direction: row;
    padding: 3rem 8rem 0rem;
  }
`;

const ColumnaUno = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  @media screen and (min-width: 1200px) {
    order: 2;
    flex: 5;
  }
`;

const ImgPerros = styled.img`
  width: 90%;
  margin: 0 auto;
`;

const ColumnaDos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media screen and (min-width: 1200px) {
    order: 1;
    align-self: flex-start;
    flex: 3;
    width: 50%;
    align-items: flex-start;
  }
`;

const HeaderTitle = styled.div`
  color: #fff;
  text-align: center;
  width: 70%;
  font-size: 2rem;
  margin: 0 auto;
  line-height: 1.8rem;
  font-family: 'Macondo', cursive;
  margin-top: 2rem;
  @media screen and (min-width: 1000px) {
    font-size: 4rem;
    line-height: normal;
  }
  @media screen and (min-width: 1200px) {
    width: 100%;
    text-align: left;
    margin: 0;
  }
`;

const SobreNosotrosWrapper = styled.section`
  background-color: var(--clr-pink-medium);
  padding: 1rem;
  gap: 2rem;
  position: relative;
  @media screen and (min-width: 1000px) {
    display: flex;
    padding: 0 8rem 2rem;
  }
  @media screen and (min-width: 1200px) {
    display: flex;
    gap: 1rem;
    padding: 0 14rem 2rem;
  }
`;

const IconoHuella = styled.div`
  display: none;
  @media screen and (min-width: 1000px) {
    position: absolute;
    font-size: 6rem;
    right: 2rem;
    top: -4.5rem;
    rotate: 45deg;
    color: #fff;
  }
`;

const WrapperImg = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
  @media screen and (min-width: 1000px) {
    flex: 2.5;
  }
`;

const ImagenSobreNosotros = styled.img`
  width: 100%;
  -webkit-box-shadow: 7px 6px 3px -5px #000;
  -moz-box-shadow: 7px 6px 3px -5px #000;
  box-shadow: 7px 6px 3px -5px #000;
`;
const Descripcion = styled.div`
  color: #fff;
  @media screen and (min-width: 1000px) {
    flex: 3;
  }
`;
const TituloDesc = styled.h3`
  margin-bottom: 0;
  font-family: 'Macondo', cursive;
  font-weight: normal;
  font-size: 2rem;
`;
const TextoDesc = styled.p``;

const Landing = () => {
  const datosLosts = useFetch(
    'https://pet-spaces-production.up.railway.app/api/loss/last',
  );
  const datosFound = useFetch(
    'https://pet-spaces-production.up.railway.app/api/rescues/last',
  );

  const tokenFromParams = Object.fromEntries(
    new URL(window.location).searchParams,
  ).token;

  if (tokenFromParams) {
    localStorage.setItem('token', JSON.stringify(tokenFromParams));
  }

  return (
    <>
      <HeaderWrapper>
        <ColumnaUno>
          <ImgPerros src={DogsHeader} alt='Imagen portada de perros' />
        </ColumnaUno>
        <ColumnaDos>
          <HeaderTitle>
            Reencuentrate con tu compañero de aventuras!
          </HeaderTitle>
          <ButtonComponent
            texto={'Encontré una mascota'}
            estado={'rescues'}
            path={'/form-add-found-pet'}
          />
          <ButtonComponent
            texto={'Busco mi mascota'}
            path={'/form-add-lost-pet'}
          />
        </ColumnaDos>
      </HeaderWrapper>
      <SVGWavesSuperior top={'-0.2px'} />
      <PosteosRecientes
        titulo={'Mascotas recién encontradas'}
        datos={datosFound?.data?.rescue}
        estado={'rescues'}
        pathVerTodos={'/see-all-lost/rescues'}
      />
      <PosteosRecientes
        titulo={'Mascotas recién perdidas'}
        datos={datosLosts?.data?.loss}
        estado={'loss'}
        pathVerTodos={'/see-all-lost/loss'}
      />
      <SVGWavesInferior color={'pinkMedium'} top={'4px'} />
      <SobreNosotrosWrapper>
        <IconoHuella>
          <FaPaw />
        </IconoHuella>
        <WrapperImg>
          <ImagenSobreNosotros src='https://media.istockphoto.com/photos/young-woman-embracing-dog-picture-id1142921675?k=20&m=1142921675&s=612x612&w=0&h=1FYGyiAKfpczGy5ffU2uEZg_gzhP7cN4BpXjEIs2YeI=' />
        </WrapperImg>
        <Descripcion>
          <TituloDesc>Sobre Nosotros</TituloDesc>
          <TextoDesc>
            Todos los días mascotas se desaparecen, posiblemente para siempre,
            quien sabe cuál será el destino de nuestra amada mascota?. Nosotros
            queremos ayudarte, que tu mascota que vuelva, que si encuentras una,
            puedas reunirla con su verdadera familia. Ellos sufren, nosotros
            también.
          </TextoDesc>
        </Descripcion>
      </SobreNosotrosWrapper>
    </>
  );
};

export default Landing;
