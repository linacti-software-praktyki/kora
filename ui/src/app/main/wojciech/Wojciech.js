import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import WojciechContent from './WojciechContent'

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

function Wojciech(props) {
  return (
    <Root
      header={
        <div className="p-24">
          <h4>Strona Wojciecha</h4>
        </div>
      }
      content={
        <div className="p-24">
          <WojciechContent/>
        </div>
      }
      scroll="content"
    />
  );
}

export default Wojciech;
