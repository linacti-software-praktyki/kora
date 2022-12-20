import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';

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

function SubPage(props) {
    return (
      <Root
        header={
          <div>
            <p><h2>MY<span>SUBPAGE</span></h2></p>
          </div>
        }
        content={
          <div>
            <div>
              <img src='/assets/images/demo-content/morain-lake.jpg'></img>
              <br></br>
              <h1><b>Early Sunrise</b></h1>
              <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. </p>
              <br></br>
              <a href='post'>Read more!</a>
            </div>
            <div>
              <p>This SubPage have been created by JakubMus</p>
            </div>
          </div>
        }
      />
    );
  }
  
  export default SubPage;