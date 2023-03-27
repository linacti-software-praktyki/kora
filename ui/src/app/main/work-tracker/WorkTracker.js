import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import WorkTrackerContent from './WorkTrackerContent'

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

function WorkTracker(props) {
  return (
    <Root
      header={
        <div className="p-24">
          <h4>Work Tracker</h4>
        </div>
      }
      content={
        <div className="p-32">
          <WorkTrackerContent/>
        </div>
      }
      scroll="content"
    />
  );
}

export default WorkTracker;
