import "./Loading.css";
import { LoadingProps } from "./types";

const Loading = ({ loadingText }: LoadingProps) => {
  return (
    <div className="matrix-bg">
      <div className="matrix-container">
        <p className="matrix-text" data-text={loadingText}>
          {loadingText}
        </p>
        <div className="rain"></div>
      </div>
    </div>
  );
};

export default Loading;
