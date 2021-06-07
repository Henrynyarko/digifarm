import React, { useState } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'

import useStartFarm from 'context/start-farm'
import useApi from 'context/api'

import useFetch from 'hooks/useFetch'

import Tabs from 'components/Tabs/Tabs'
import FetchCard from 'components/FetchCard'
import FarmDetails from './FarmDetails'
import { Button } from '../../index'

const CropSelection = () => {
  const { handleBack, handleNext } = useStartFarm()

  const [reload, setReload] = useState(0)

  const { getCropCategories } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch(
    'categories',
    getCropCategories,
    reload
  )

  let categories = []

  if (data) {
    categories = [{ _id: 'defualt', title: 'Top-selling farms' }, ...data]
  }

  return (
    <Box w='90%' mx='auto' mt={{ base: 20, md: 0 }}>
      <Box textAlign='center' py={10}>
        <Heading as='h4' fontSize={{ base: 'lg', md: '2xl' }}>
          Which Farm is right for you?
        </Heading>
      </Box>
      {isLoading || error ? (
        <FetchCard
          w='100%'
          mx='auto'
          align='center'
          justify='center'
          direction='column'
          error={error}
          loading={isLoading}
          reload={triggerReload}
        />
      ) : (
        <>
          <Box pos='relative'>
            <Tabs
              py='0'
              px='0'
              boxWidth='100%'
              direction={{ base: 'column', md: 'row' }}
              display={{ base: 'flex', md: 'block' }}
              width={{ base: '100%', md: 'initial' }}
            >
              {categories?.map(cat => (
                <Box key={cat._id} label={cat.title}>
                  <FarmDetails
                    catName={cat.title}
                    query={
                      cat._id !== 'defualt' && { category: cat._id, status: 1 }
                    }
                  />
                </Box>
              ))}
            </Tabs>
          </Box>
          <Flex w='full' justify='flex-end' my={6}>
            <Button
              h={12}
              width={40}
              fontSize='md'
              btntitle='Prev'
              color='gray.700'
              colorScheme='white'
              onClick={handleBack}
              borderWidth={1}
            />
            <Box mx={2} />
            <Button
              btntitle='Continue'
              w={{ base: 70, md: 40 }}
              h={12}
              fontSize='md'
              onClick={handleNext}
            />
          </Flex>
        </>
      )}
    </Box>
  )
}

export default CropSelection
