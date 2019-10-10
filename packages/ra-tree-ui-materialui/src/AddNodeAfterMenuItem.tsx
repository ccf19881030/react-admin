import React, { SFC, ComponentType, ReactElement } from 'react';
import { Record, withTranslate, Translate } from 'ra-core';
import { MenuItemProps } from '@material-ui/core/MenuItem';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

interface Props {
    label?: string;
    icon: ReactElement<any>;
}

interface InjectedProps {
    basePath: string;
    record: Record;
    parentSource: string;
    positionSource?: string;
    translate: Translate;
}

const AddNodeAfterMenuItemView: SFC<Props & InjectedProps & MenuItemProps> = ({
    basePath,
    label = 'ra.tree.add_node_after',
    parentSource,
    positionSource,
    record: siblingRecord,
    translate,
    ...props
}) => {
    const record = {
        [parentSource]: siblingRecord[parentSource],
        [positionSource]: siblingRecord[positionSource] + 1,
    };

    return (
        <MenuItem
            // @ts-ignore
            component={Link}
            to={{
                pathname: `${basePath}/create`,
                state: { record },
            }}
            label={label}
            {...props}
        >
            {translate(label)}
        </MenuItem>
    );
};

const AddNodeAfterMenuItem = withTranslate(
    // @ts-ignore
    AddNodeAfterMenuItemView
) as ComponentType<Props & MenuItemProps>;

export default AddNodeAfterMenuItem;
