
import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs,Typography, Box } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home'; // Import the desired icons
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

interface Breadcrumb {
    path: string;
    label: string;
    icon?: React.ReactNode; // Icon for the breadcrumb
    margin?: string;
}

interface BreadcrumbsProps {
    breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {


    return (
        <MuiBreadcrumbs >
            {breadcrumbs.map((breadcrumb, index) => (
               
                <Link
                    key={index}
                    href={breadcrumb.path}
                    color={index === breadcrumbs.length - 1 ? 'textPrimary' : 'inherit'}
                    >
                                       
                    <Box display="flex" alignItems="center">
                        {breadcrumb.icon && (
                                <Box marginRight={breadcrumb.margin || 1}>
                                    {React.isValidElement(breadcrumb.icon) ? (
                                        React.cloneElement(breadcrumb.icon as React.ReactElement<any, string | React.JSXElementConstructor<any>>, { fontSize: 'small' })
                                    ) : (
                                        <span>{breadcrumb.icon}</span>
                                    )}
                                </Box>
                            )}
                               
                        
                        <Typography variant="body1">{breadcrumb.label}</Typography>
                    </Box>
                 
                    </Link>
               
            ))}
        </MuiBreadcrumbs>

    );
};

export default Breadcrumbs;