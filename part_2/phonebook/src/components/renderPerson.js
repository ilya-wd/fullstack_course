const Person = (props) => (
  <p>
    {props.name} {props.number}
    <button key={props.id} type="submit" onClick={props.deletePerson}>
      delete
    </button>
  </p>
);

export default Person;
