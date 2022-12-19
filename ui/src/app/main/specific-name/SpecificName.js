import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DemoContent from '@fuse/core/DemoContent';

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

function SpecificName(props) {
  const { t } = useTranslation('examplePage');

  return (
    <Root
      header={
        <div className="p-24">
          <h4>Przykładowa strona</h4>
        </div>
      }
      content={
        <div className="p-24">
          {/* <DemoContent /> */}
          <p>nowa strona </p>
          <a href="404">
            <img style={{height: '100px'}} src="https://www.wprost.pl/_thumb/8f/9e/4626141785c4c4bbc93d12b7caba.jpeg" alt="piesek" srcset="" />
          </a>
        </div>
      }
      scroll="content"
    />
  );
}

export default SpecificName;
