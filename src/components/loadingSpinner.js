import { Fragment } from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <Fragment>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        <div className="spinner-text-wrapper">
          <div className="spinner-text"> در حال خواندن فایل</div>
          <div className="spinner-text"> لطفا صبر کنید</div>
        </div>
      </div>
    </Fragment>
  );
}
