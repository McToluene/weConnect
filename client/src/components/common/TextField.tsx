import classnames from "classnames";
import * as React from "react";
import { ChangeEvent } from "react";
import { SFC } from "react";

interface ITextProps {
  name: string;
  placeholder?: string;
  value: string;
  label?: string;
  error?: string;
  info?: string;
  type: string;
  disabled?: boolean;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

const TextField: SFC<ITextProps> = props => {
  return (
    <div className="form-group">
      <input
        type={props.type}
        className={classnames("form-control mb-1", {
          "is-invalid": props.error
        })}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

export default TextField;
