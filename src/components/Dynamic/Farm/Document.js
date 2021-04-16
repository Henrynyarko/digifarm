import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import DynamicDocument from '../Document'
import FarmReceiptCard from '../Cards/FarmReceiptCard'

export default function Document({
  digitalFarmerFarm,
  activities,
  tasks,
  ScheduledTasks,
  farmfeeds
}) {
  let state = 'compA'

  return (
    <Grid
      templateRows={{ md: 'repeat(1 1fr)' }}
      templateColumns={{ md: '5% 65% 30%' }}
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
      d={{ base: 'block', md: 'grid' }}
      px={{ base: 4, md: 0 }}
    >
      <GridItem>
        <Box
          minW={{ lg: '65%' }}
          as='main'
          color='gray.800'
          bg={{ md: 'gray.50' }}
          fontFamily='body'
          overflowX='hidden'
          py={{ md: 56 }}
          px={{ md: 24 }}
          mt={{ base: 36, md: 0 }}
          minH={{ lg: '100vh' }}
        >
          <Box mt={{ md: 10 }}>
            <DynamicDocument
              document={state}
              activities={activities}
              tasks={tasks}
              ScheduledTasks={ScheduledTasks}
              digitalFarmerFarm={digitalFarmerFarm}
              farmfeeds={farmfeeds}
            />
          </Box>
        </Box>
      </GridItem>
      <GridItem mt={{ base: 16, md: 0 }} mb={{ base: 32, md: 0 }}>
        <Box
          py={8}
          right={{ md: 0 }}
          bg='white'
          as='rightsidebar'
          bottom={{ md: 0 }}
          pos={{ md: 'fixed' }}
          px={{ md: 8 }}
          h={{ lg: '84vh' }}
          w={{ md: '30%' }}
          shadow={{ md: 'md' }}
          overflowY={{ md: 'scroll' }}
        >
          <Grid gap={8} d={{ base: 'block', md: 'grid' }}>
            {digitalFarmerFarm?.order?.status === 'PAID' && (
              <React.Fragment>
                <FarmReceiptCard
                  title='Agreement'
                  type='agreement'
                  farm={digitalFarmerFarm}
                />
              </React.Fragment>
            )}
          </Grid>
        </Box>
      </GridItem>
    </Grid>
  )
}

Document.propTypes = {
  digitalFarmerFarm: PropTypes.any,
  activities: PropTypes.any,
  tasks: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any
}
