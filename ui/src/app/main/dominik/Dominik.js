import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DominikContent from './DominikContent'

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function Dominik(props) {
  return (
    <Root
      header={
        <div className="p-24">
          <h4>Strona Dominika</h4>
        </div>
      }
      content={
        <div className="p-24">
          <DominikContent/>
        </div>
      }
      scroll="content"
    />
  );
}

export default Dominik;
