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
  icon?: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

const TextFieldGroup: SFC<ITextProps> = props => {
  return (
    <div className="form-group">
      <div className="input-group mb-3">
        <div className="input-group-pretend">
          <span className="input-group-text mr-1">
            <i className={props.icon} />
          </span>
        </div>
        <input
          type={props.type}
          className={classnames("form-control form-control-sm ", {
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
    </div>
  );
};

export default TextFieldGroup;
