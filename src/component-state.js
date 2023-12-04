var root = ReactDOM.createRoot(document.getElementById("root"));

//classin functiondan esas fergi state ve lifecycledir bunlar funcda yoxdur
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.clearItems = this.clearItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      gorevler: ["item 1", "item 2", "item 3"],
    };
  }

  deleteItem(item) {
    this.setState((prev) => {
      const arr = prev.gorevler.filter((i) => {
        return item != i;
      });
      return {
        gorevler: arr,
      };
    });
  }
  clearItems() {
    this.setState({
      gorevler: [],
    });
  }
  addItem(items) {
    if (this.state.gorevler.indexOf(items) > -1) {
      return "Repeated!";
    }
    this.setState((prevState) => {
      return {
        gorevler: prevState.gorevler.concat(items),
      };
    });
  }
  render() {
    const data = {
      baslik: "Todo Application",
      aciklama: "Waiting Items...",
    };

    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <Header title={data.baslik} description={data.aciklama} />
          </div>
          <div className="card-body">
            <TodoList
              items={this.state.gorevler}
              clear={this.clearItems}
              deleteItem={this.deleteItem}
            />
          </div>
          <div className="card-footer">
            <NewItem addItem={this.addItem} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const jsonObj = localStorage.getItem("items");
    const items = JSON.parse(jsonObj);
    if (items) {
      this.setState({
        gorevler: items,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.gorevler.length !== this.state.gorevler.length) {
      const jsonStr = JSON.stringify(this.state.gorevler);
      localStorage.setItem("items", jsonStr);
    }
  }
}

function Header(props) {
  return (
    <div className="text-center">
      <h1>{props.title}</h1>
      <p> {props.description}</p>
    </div>
  );
}
function TodoList(props) {
  return (
    <div>
      <ul className="list-group">
        {props.items.map((gorev, index) => (
          <TodoItem key={index} item={gorev} deleteItem={props.deleteItem} />
        ))}
      </ul>
      {props.items.length > 0 ? (
        <p>
          <button
            className="btn btn-outline-danger float-end mt-3"
            onClick={props.clear}
          >
            Delete
          </button>
        </p>
      ) : (
        <div className="alert alert-danger">Add Something</div>
      )}
    </div>
  );
}
class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.FormSubmit = this.FormSubmit.bind(this);
    this.state = {
      error: "",
    };
  }

  FormSubmit(e) {
    e.preventDefault();
    let items = e.target.elements.txtInput.value.trim();
    if (items) {
      e.target.elements.txtInput.value = "";
      const err = this.props.addItem(items);
      this.setState({
        error: err,
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.FormSubmit}>
          <div className="input-group">
            <input className="form-control" type="txt" name="txtInput" />
            <button className="btn btn-secondary" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}
function TodoItem(props) {
  return (
    <li className="list-group-item">
      {props.item}
      <button
        className="btn btn-danger btn-sm float-end"
        onClick={() => {
          props.deleteItem(props.item);
        }}
      >
        x
      </button>
    </li>
  );
}

root.render(<TodoApp />);
