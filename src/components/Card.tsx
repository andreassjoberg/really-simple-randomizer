import { faBeer, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const placeToString = (place: number) => {
  const str = place.toString();
  const lastDigit = str[str.length - 1];

  let ending = "th";
  if (lastDigit === "1") ending = "st";
  else if (lastDigit === "2") ending = "nd";
  else if (lastDigit === "3") ending = "rd";

  return `${place}${ending} place`;
}

export const Card = ({ name, place, animate, isWinner, numberOfRewards }: { name: string, place: number, animate?: boolean, isWinner?: boolean, numberOfRewards?: number }) => {
  return (
    <div className={["card mt-2", animate ? "animated backInDown" : "", isWinner ? "is-winner" : ""].join(" ").trim()}>
      <div className="card-header">
        {isWinner && (
          <FontAwesomeIcon icon={faTrophy} className="me-2" />
        )}
        {placeToString(place)}
      </div>
      <div className="card-body">
        {name}
      </div>
      {typeof numberOfRewards === "number" && numberOfRewards > 0 && (
        <div className="card-footer">
          <FontAwesomeIcon icon={faBeer} className="me-2" />
          {numberOfRewards}
        </div>
      )}
    </div>
  );
}