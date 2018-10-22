import classnames from "classnames";
import * as React from "react";
import { ChangeEvent } from "react";
import { SFC } from "react";

interface ITextProps {
  name: string;
  value: string;
  error?: string;
  info?: string;
  options: IOptions[];
  onChange(event: ChangeEvent<HTMLSelectElement>): void;
}

interface IOptions {
  label: string;
  value: string | number;
}

const SelectListGroup: SFC<ITextProps> = props => {
  const selectOptions = props.options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control mb-1", {
          "is-invalid": props.error
        })}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {selectOptions}
      </select>
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

export default SelectListGroup;
