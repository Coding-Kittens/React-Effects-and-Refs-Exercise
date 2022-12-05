const Card = ({ image, value, suit }) => {
  return <img src={image} alt={`${value} of ${suit}`} />;
};

export default Card;
