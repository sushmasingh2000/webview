import { Tabs, Tab, Box } from '@mui/material';

const TopTabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        variant="fullWidth"
      >
        <Tab
          label="Games"
          sx={{ textTransform: 'none', fontSize: '14px', fontWeight: 500 }}
        />
        <Tab
          label="Social media"
          sx={{ textTransform: 'none', fontSize: '14px', fontWeight: 500 }}
        />
      </Tabs>
    </Box>
  );
};

export default TopTabs;
