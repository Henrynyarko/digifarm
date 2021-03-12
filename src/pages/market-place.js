import React, { useState } from 'react'
import Layout from 'container/Layout'
import { Box, Flex, Icon, Text, Heading } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'
import BuyerCard from 'components/Cards/BuyerCard'
// import IllustrationImage from '../assets/images/home/illustration.png'
// import Oval from '../assets/images/Oval.svg'
import WarehouseCard from 'components/Cards/WarehouseCard2'
// import ArrowButton from '../components/Button/ArrowButton'
import useApi from '../context/api'
import useAuth from 'context/auth'
/* eslint-disable */
import { motion } from 'framer-motion'
import AboutBuyer from 'components/Modals/AboutBuyer'
import useFetch from 'hooks/useFetch'


// const MotionFlex = motion.custom(Flex)
// const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const Marketplace = () => {
  document.title = 'Complete Farmer | Marketplace'
  const { getSourcingOrders, getMyFarms} = useApi()
  const [ varieties, setVarieties ] = useState([])
  const [ buyers, setBuyers ] = useState([])
  const {isAuthenticated} = useAuth()
  const {user} = isAuthenticated()
  const [loading, setLoading] = useState("fetching")
  const [reload, setReload] = React.useState(0)

  const {
    data:myfarms,
    isLoading: myFarmsIsLoading,
    error: myFarmssHasError
  } = useFetch('my_farms', getMyFarms, reload, { user: user?._id })
  console.log(myfarms?.order, 'farms')


  const {
    data: SourcingOrders,
    isLoading: SourcingOrdersIsLoading,
    error: SourcingOrdersHasError
  } = useFetch('sourcing_orders', getSourcingOrders, reload, {
    cropVariety: "602e1d1d7c083a1edd24fab9"
  })
  console.log(SourcingOrders,"buyers")
  

  return (
    <Layout>
      <Box pos='absolute' top={{md:40}} left={{md:60}} w='100%'>
        <Heading>Warehouse / Marketplace </Heading>
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

        <Box mt={20} ml={2}>
          <Flex my={3} w='62%' align='center' direction='column'>
              {myfarms?.map(myfarm => (
                <WarehouseCard
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
          </Flex>
        </Box>
        <Box mt ={20} ml={2}>
          {SourcingOrders?.map(buyers =>(
          <BuyerCard
          _id={buyers._id}
          key={buyers._id}
          buyers={buyers}
          />
          ))}
        </Box>   
      </Box>
    </Layout>
   
  )
}

export default Marketplace
