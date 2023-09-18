import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { darken, lighten, styled } from '@mui/material/styles';

const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .super-app-theme--NEED_CHANGES': {
        backgroundColor: getBackgroundColor(theme.palette.info.main, theme.palette.mode),
        '&:hover': {
            backgroundColor: getHoverBackgroundColor(
                theme.palette.info.main,
                theme.palette.mode,
            ),
        },
        '&.Mui-selected': {
            backgroundColor: getSelectedBackgroundColor(
                theme.palette.info.main,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor(
                    theme.palette.info.main,
                    theme.palette.mode,
                ),
            },
        },
    },
    '& .super-app-theme--ACCEPTED': {
        backgroundColor: getBackgroundColor(
            theme.palette.success.main,
            theme.palette.mode,
        ),
        '&:hover': {
            backgroundColor: getHoverBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode,
            ),
        },
        '&.Mui-selected': {
            backgroundColor: getSelectedBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor(
                    theme.palette.success.main,
                    theme.palette.mode,
                ),
            },
        },
    },
    '& .super-app-theme--UNDER_CONSIDERATION': {
        backgroundColor: getBackgroundColor(
            theme.palette.warning.main,
            theme.palette.mode,
        ),
        '&:hover': {
            backgroundColor: getHoverBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode,
            ),
        },
        '&.Mui-selected': {
            backgroundColor: getSelectedBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor(
                    theme.palette.warning.main,
                    theme.palette.mode,
                ),
            },
        },
    },
    '& .super-app-theme--REFUSED': {
        backgroundColor: getBackgroundColor(
            theme.palette.error.main,
            theme.palette.mode,
        ),
        '&:hover': {
            backgroundColor: getHoverBackgroundColor(
                theme.palette.error.main,
                theme.palette.mode,
            ),
        },
        '&.Mui-selected': {
            backgroundColor: getSelectedBackgroundColor(
                theme.palette.error.main,
                theme.palette.mode,
            ),
            '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor(
                    theme.palette.error.main,
                    theme.palette.mode,
                ),
            },
        },
    },
}));

export default function OrdersStyledDataGrid(props) {
    return (
            <StyledDataGrid
                {...props}
                getRowClassName={(params) => `super-app-theme--${params.row.requestStatus}`}
            />
    );
}