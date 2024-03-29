var root = ReactDOM.createRoot(document.getElementById("root"));

class TodoApp extends React.Component {
  render() {
    const data = {
      baslik: "Todo Application",
      aciklama: "Bekleyen Görevler",
      gorevler: ["görev 1", "görev 2", "görev 3"],
    };
    return (
      <div>
        <Header title={data.baslik} description={data.aciklama} />
        <TodoList items={data.gorevler} />
        <NewItem />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p> {this.props.description}</p>
      </div>
    );
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.clearItems = this.clearItems.bind(this);
  }
  clearItems() {}
  render() {
    return (
      <div>
        <ul>
          {this.props.items.map((gorev, index) => (
            <TodoItem key={index} item={gorev} />
          ))}
        </ul>
        <button onClick={this.clearItems}>Delete</button>
      </div>
    );
  }
}
class NewItem extends React.Component {
  FormSubmit(e) {
    e.preventDefault();
    let items = e.target.elements.txtInput.value.trim();
    if (items) {
      e.target.elements.txtInput.value = "";
      console.log(items);
    }
  }
  render() {
    return (
      <form onSubmit={this.FormSubmit}>
        <input type="txt" name="txtInput" />
        <button type="submit">Add</button>
      </form>
    );
  }
}

class TodoItem extends React.Component {
  render() {
    return <li>{this.props.item}</li>;
  }
}

root.render(<TodoApp />);
