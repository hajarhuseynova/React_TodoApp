import React from "react";

class SelectedproductList extends React.Component {
  render() {
    return (
      <div>
        {this.props.products.length == 0 ? (
          <div className="alert alert-warning mt-3">No Product!</div>
        ) : (
          <ol className="list-group list-group-numbered mt-3 d-flex justify-content-between align-items-start">
            {this.props.products.map((item, index) => (
              <li className="list-group-item d-flex">
                <div className="m-auto ms-2 mx-2">{item.product.name}</div>
                <span className="badge bg-primary rounded-pill me-2">
                  {item.count}
                </span>
                <span
                  className="badge bg-danger rounded-pill "
                  onClick={() => this.props.deleteProduct(item.product)}
                >
                  x
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
}

export default SelectedproductList;
