import React from 'react';
import {
    Typography,
    FormControl,
    FormLabel,
    FormGroup,
    Checkbox,
    Input,
    InputLabel,
    makeStyles,
    FormControlLabel,
    Box,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    checkboxFormControl: {
        marginRight: 100,
    },
    inputFormControl: {
        marginRight: 40,
    },
});

export const OfferSearchBox = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <Box component="div" m={2}>
            <FormControl className={classes.checkboxFormControl}>
                <FormLabel component="legend">Filter</FormLabel>
                <FormGroup>
                    {props.rawResources
                        ? props.rawResources.map((resource, index) => (
                              <FormControlLabel
                                  control={
                                      <Checkbox
                                          name={resource.id}
                                          defaultChecked={true}
                                          onChange={
                                              () => {
                                                  console.log('blub');
                                              } // handleFilterTypeChange(index)
                                          }
                                      />
                                  }
                                  label={resource.name}
                              />
                          ))
                        : null}
                </FormGroup>
            </FormControl>
            <FormControl className={classes.inputFormControl}>
                <InputLabel htmlFor="postCode">
                    {t('pages.offerOverview.postcode')}
                </InputLabel>
                <Input id="postCode" name="postCode" />
            </FormControl>
        </Box>
    );
};
