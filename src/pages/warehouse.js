/* eslint-disable */

import React, { useState } from 'react'
import Layout from 'container/Layout'
import { Heading, Box, Flex, Icon, Text, Spinner } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'
import WarehouseCard2 from 'components/Cards/WarehouseCard2'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useFetch from 'hooks/useFetch'

const Warehouse = () => {
  document.title = 'Complete Farmer | Warehouse'
  const { getMyFarms } = useApi()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [reload, setReload] = React.useState(0)

  const {
    data: myfarms,
    isLoading: myFarmsIsLoading,
    error: myFarmssHasError
  } = useFetch('my_farms', getMyFarms, reload, { user: user?._id })
  console.log(myfarms, 'farms')

  return (
    <Layout>
      <Box pos='absolute' top={{ md: 40 }} left={{ md: 60 }} w='100%'>
        <Heading>Warehouse</Heading>
        <Box
          mt={2}
          mb={6}
          borderRadius={40}
          borderWidth={2}
          borderColor='rgba(208, 143, 49, 0.1)'
          bgColor='rgba(208, 143, 49, 0.1)'
          p={2}
          position='absolute'
        >
          <Flex>
            <Icon as={IoWarningOutline} color='#D08F31' w={7} h={7} />
            <Text
              as='span'
              fontWeight='bold'
              fontSize='18px'
              color='#D08F31'
              px={4}
            >
              If produce in the warehouse are not sold within 2 weeks, they will
              automatically be sold to a buyer
            </Text>
          </Flex>
        </Box>

        <Box mt={20} p={16}>
          <Flex my={3} w='62%' align='center' direction='column'>
            { myfarms?.map( myfarm => (
            <WarehouseCard2
              _id={myfarm._id}
              key={myfarm?.name}
              name={`${myfarm?.order?.product?.cropVariety?.crop?.name} Warehouse`}
              location={`${myfarm?.order?.product?.location?.name},${myfarm?.order?.product?.location?.state}`}
              image={`${myfarm?.order?.product?.cropVariety?.imageUrl}`}
              quantity={myfarm?.storage?.quantity}
              weight={myfarm?.storage?.weight}
              bags={myfarm?.storage?.numberOfBags}
              condition={myfarm?.storage?.yieldConditions}
              mr={3}
              ml={14}
            />
            ))}

            <Box>
              <Text fontSize='md' ml={2} color='cf.400'>
                {/* Something went wrong */}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Layout>
  )
}

export default Warehouse
