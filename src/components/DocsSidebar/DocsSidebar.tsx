import * as React from 'react';
import { StickyProps } from 'react-sticky';

import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Grid from 'src/components/Grid';

import DocComponent, { Doc } from './DocComponent';

type ClassNames = 'root' | 'title';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme & Linode.Theme) => ({
  root: {},
  title: {
    fontSize: '1.5rem',
    color: theme.color.green,
  },
});

interface Props {
  docs: Doc[];
  isSticky?: boolean;
}

type CombinedProps = Props & StickyProps & WithStyles<ClassNames>;

const styled = withStyles(styles, { withTheme: true });

class DocsSidebar extends React.Component<CombinedProps>  {
  render() {
    const { classes, docs, style, isSticky } = this.props;

    if (docs.length === 0) {
      return null;
    }

    let stickyStyles;
    if (isSticky) {
      stickyStyles = {
        ...style,
        paddingTop: 24,
      };
    }

    return (
      <Grid item style={stickyStyles}>
        <Typography
          role="header"
          variant="title"
          className={classes.title}
          data-qa-sidebar-title
        >
          Linode Docs
        </Typography>
        {
          docs.map((doc, idx) => <DocComponent key={idx} {...doc} />)
        }
      </Grid>
    );
  }
}

export default styled<Props>(DocsSidebar);
