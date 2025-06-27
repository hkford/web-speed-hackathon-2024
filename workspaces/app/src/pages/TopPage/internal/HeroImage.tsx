import styled from 'styled-components';

const _Picture = styled.picture`
  display: inline-block;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Picture>
      <source srcSet="./assets/heroImage.jpg" type="image/jpeg" />
      <_Image 
        alt="Cyber TOON" 
        src="./assets/heroImage.png"
        width={4096}
        height={2723}
        loading="eager"
      />
    </_Picture>
  );
};
