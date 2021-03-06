// @flow
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {Ledger, type Account} from "../../ledger/ledger";

type DropdownProps = {|
  +ledger: Ledger,
  +setCurrentAccount: (Account | null) => void,
  +placeholder?: string,
|};

const useStyles = makeStyles({combobox: {margin: "0px 16px 16px"}});

export default function AccountDropdown({
  placeholder,
  setCurrentAccount,
  ledger,
}: DropdownProps) {
  const classes = useStyles();
  const items = ledger.accounts().filter((a) => a.active);

  return (
    <Autocomplete
      size="medium"
      className={classes.combobox}
      onChange={(...args) => {
        const [, inputObj] = args;
        setCurrentAccount(inputObj);
      }}
      fullWidth
      options={items}
      getOptionLabel={(item: Account) => item.identity.name}
      renderInput={(params) => (
        <TextField
          size="large"
          fullWidth
          {...params}
          InputProps={{...params.InputProps, disableUnderline: true}}
          label={placeholder}
        />
      )}
    />
  );
}
