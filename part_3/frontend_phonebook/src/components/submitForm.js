const SubmitForm = (props) => (
  <form onSubmit={props.addName}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number:{' '}
      <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">save</button>
    </div>
  </form>
);

export default SubmitForm;
