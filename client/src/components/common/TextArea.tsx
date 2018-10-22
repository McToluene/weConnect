import classnames from "classnames";
import * as React from "react";
import { ChangeEvent } from "react";
import { SFC } from "react";

interface ITextProps {
  name: string;
  placeholder?: string;
  value: string;
  error?: string;
  info?: string;
  onChange(event: ChangeEvent<HTMLTextAreaElement>): void;
}

const TextArea: SFC<ITextProps> = props => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control mb-1", {
          "is-invalid": props.error
        })}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

export default TextArea;
