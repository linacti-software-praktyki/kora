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

export default function SubPage(props) {
  const head = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#000000",
    width: "100%",
    color: "white",
  };
  const title = {
    margin: "25px",
  }; 
  const span = {
    color: "orange"
  };
  const cont = {
    display: "flex",
  }
  const post = {
    border: "1px solid grey",
    padding: "2px",
    width: "250px",
    marginTop: "10px"
  }
  const img = {
    height: "200px",
    width: "250px",
  }
  const foot = {
    position: "absolute",
    bottom: "0px",
    justifyContent: "center"
  }
    return (
      <Root
        header={
          <div style={head}>
            <p><h2 style={title}>MY<span style={span}>SUBPAGE</span></h2></p>
          </div>
        }
        content={
          <div style={cont}>
            <div style={post}>
              <img src='/assets/images/demo-content/morain-lake.jpg' style={img}></img>
              <br></br>
              <h1><b>Early Sunrise</b></h1>
              <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. </p>
              <br></br>
              <a href='post'>Read more!</a>
            </div>
            <div style={foot}>
              <p>This SubPage have been created by JakubMus</p>
            </div>
          </div>
        }
      />
    );
  }