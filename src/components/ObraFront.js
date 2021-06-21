const Obrafront = ({ image, name }) => {
  console.log(image);
  return (
    <div>
      <p>{name}</p>
      <img
        src="https://i.postimg.cc/W3R4J237/11-853.jpg"
        alt={`of ${name}`}
        width="200"
      />
    </div>
  );
};

export default Obrafront;
