import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import {
  Box,
  Tag,
  Flex,
  Avatar,
  Heading,
  Text,
  Icon,
  Image,
  Collapse,
  Skeleton
} from '@chakra-ui/react'
import useAuth from 'context/auth'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FirstLettersToUpperCase } from 'helpers/misc'
import ReactPlayer from 'react-player/lazy'

const FarmFeedCard = ({ activeFarm, status, content, timestamp, loading }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [show, setShow] = React.useState(false)
  const [titles, setTitles] = React.useState([])
  const handleToggle = () => setShow(!show)

  const [selectedItem, setSelectedItem] = React.useState({})

  const [activeIndex, setActiveIndex] = React.useState(0)

  const [items, setItems] = React.useState([])
  const handleClick = (value, array, index, indexFunc, selectedItemFunc) => {
    const comparant =
      index + value === 0 ||
      index + value > array.length - 1 ||
      index + value < 0
        ? 0
        : index + value

    indexFunc(comparant)
    selectedItemFunc(array[comparant])
  }

  const YoutubeSlide = ({ url }) => (
    <ReactPlayer
      width='100%'
      controls={true}
      loop={true}
      volume={0.3}
      url={url}
      playing={false}
    />
  )
  YoutubeSlide.propTypes = {
    url: PropTypes.any
  }

  React.useEffect(() => {
    let array = []
    const _feeds = feed => {
      return feed?.media?.forEach(_media => {
        if (_media?.type === 'image' || _media?.type === 'video')
          array.push(_media)
      })
    }
    const feeds = () =>
      content?.data?.map(feed => {
        return _feeds(feed?.feed)
      })

    if (status !== 'news' && status !== 'weekly_videos') {
      feeds()
    }

    if (array.length) {
      setItems(array)
      setSelectedItem(array[0])
    }
  }, [content, status])

  React.useEffect(() => {
    let titles = []
    if (content) {
      const process = () =>
        content?.data?.map(item => titles.push(item?.task?.title))
      process()
      if (titles?.length) {
        titles = Array.from(new Set(titles))
        setTitles(titles)
      }
    }
  }, [content])

  const Detail = () => {
    return (
      <Flex
        align='center'
        borderBottomWidth={1}
        justify='space-between'
        borderBottomColor='gray.200'
        px={{ base: 4, md: 0 }}
        py={4}
      >
        <Flex align='center'>
          <Avatar
            size='md'
            src={activeFarm?.order?.product?.cropVariety?.imageUrl}
          />
          <Box ml={{ base: 2, md: 4 }}>
            <Heading
              as='h4'
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight={700}
            >
              {user?.firstName}’s Farm
            </Heading>
            <Text color='gray.500' fontSize={{ base: 'xs', md: 'sm' }} mt={-1}>
              {`${activeFarm?.order?.product?.location?.name}, ${activeFarm?.order?.product?.location?.state}`}
            </Text>
          </Box>
        </Flex>

        <Flex direction='column' justify='center' align='center'>
          <Box mx={{ base: 4 }}>
            <Text color='cf.green' fontWeight={700}>
              {status !== 'news' || status !== 'weekly_videos'
                ? 'FARM FEED'
                : null}
            </Text>
          </Box>
          <Text fontSize={{ base: 'xs', md: 'sm' }} color='gray.500' mt={-1}>
            {timestamp}
          </Text>
        </Flex>
      </Flex>
    )
  }

  const FarmContent = () => {
    const mapKey = i => i
    if (items?.length) {
      return (
        <>
          <Box py={{ base: 4 }} px={{ base: 4, md: 8 }}>
            <Detail />
          </Box>
          <Box pos='relative'>
            {loading ? (
              <Skeleton height={{ md: 110 }} />
            ) : (
              selectedItem?.type === 'image' && (
                <Image
                  fallback={<Skeleton height={{ md: 110 }} />}
                  fallbackSrc='https://via.placeholder.com/300'
                  h={{ md: 110 }}
                  w='100%'
                  objectFit='cover'
                  src={selectedItem?.url}
                />
              )
            )}

            {loading ? (
              <Skeleton height={{ md: '100%' }} />
            ) : (
              selectedItem?.type === 'video' && (
                <YoutubeSlide url={selectedItem?.url} muted playing={false} />
              )
            )}
            <Flex
              align='center'
              justify='center'
              pos='absolute'
              bottom={6}
              left={{ base: '50%', md: '45%' }}
              right={{ base: '50%' }}
            >
              <Flex
                as='button'
                role='button'
                aria-label='prev button'
                align='center'
                justify='center'
                borderColor='white'
                borderWidth={1}
                minW={10}
                minH={10}
                rounded='100%'
                color='white'
                mr={2}
                outlineColor='none'
                outline='none'
                onClick={() => {
                  return handleClick(
                    -1,
                    items,
                    activeIndex,
                    setActiveIndex,
                    setSelectedItem
                  )
                }}
              >
                <Icon as={BsChevronLeft} />
              </Flex>
              <Flex
                as='button'
                role='button'
                aria-label='next button'
                align='center'
                justify='center'
                borderColor='white'
                bg='white'
                minW={10}
                minH={10}
                rounded='100%'
                color='cf.green'
                outlineColor='black'
                outline='black'
                ml={2}
                onClick={() => {
                  return handleClick(
                    +1,
                    items,
                    activeIndex,
                    setActiveIndex,
                    setSelectedItem
                  )
                }}
              >
                <Icon as={BsChevronRight} />
              </Flex>
            </Flex>
          </Box>
          <Box px={{ base: 4, md: 16 }}>
            <Box mt={6}>
              <Flex direction='row' align='center'>
                <Tag
                  color='cf.green'
                  justifyContent='center'
                  bgGradient='linear(to-l, #DEECDC,#EFF6ED)'
                  rounded={20}
                  minW='12'
                  maxH='5'
                  px={5}
                  py={3}
                  mr={2}
                >
                  <Text fontWeight={600}>Activity</Text>
                </Tag>
                <Text fontWeight={400}>
                  {FirstLettersToUpperCase(content?.title)}
                </Text>
              </Flex>

              <Collapse
                startingHeight={108}
                in={show}
                onClick={handleToggle}
                cursor='pointer'
              >
                {titles?.map((title, i) => {
                  return (
                    <Fragment key={mapKey(i)}>
                      <Heading
                        as='h6'
                        mt={6}
                        fontSize={{ base: 'sm', md: 'xl' }}
                      >
                        {title}
                      </Heading>
                      {content?.data?.map(
                        (body, i) =>
                          title === body?.task?.title && (
                            <Text
                              key={mapKey(i)}
                              color='gray.500'
                              mt={3}
                              fontSize={{ base: 'sm', md: 'md' }}
                            >
                              {body?.feed?.summary?.replace(/<[^>]*>/g, '')}
                            </Text>
                          )
                      )}
                    </Fragment>
                  )
                })}
              </Collapse>
              <Box as='button' onClick={handleToggle}>
                <Text color='cf.green' py={{ base: 1 }}>
                  {!show ? 'Read More' : 'Collapse'}
                </Text>
              </Box>
            </Box>
          </Box>
        </>
      )
    }

    return null
  }

  return (
    <FarmBoardCardWrapper status={status} content={content}>
      <FarmContent />
    </FarmBoardCardWrapper>
  )
}

FarmFeedCard.propTypes = {
  activeFarm: PropTypes.object,
  status: PropTypes.any,
  content: PropTypes.any,
  timestamp: PropTypes.any,
  loading: PropTypes.bool
}

export default FarmFeedCard
