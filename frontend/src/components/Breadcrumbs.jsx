import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div style={{ margin: "15px" }}>
      <Link to="/">Home</Link>

      {paths.map((path, index) => {
        const route = "/" + paths.slice(0, index + 1).join("/");

        return (
          <span key={route}>
            {" > "}
            <Link to={route}>{path}</Link>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;