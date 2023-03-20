import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import MatiContent from './MatiContent'

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

function Mati(props) {
  return (
    <Root
      header={
        <div className="p-24">
          <h4>Strona Matiego</h4>
        </div>
      }
      content={
        <div className="p-24">
          <MatiContent/>
        </div>
      }
      scroll="content"
    />
  );
}

export default Mati;
