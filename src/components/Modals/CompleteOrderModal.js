/* eslint-disable no-console */
import React from 'react'
import {
  Flex,
  // Icon,
  Box,
  Text,
  Modal,
  useToast,
  Heading,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { FiCreditCard, FiUpload } from 'react-icons/fi'
import useStartFarm from 'context/start-farm'
import useApi from 'context/api'

import Button from 'components/Button'
import Upload from 'components/Form/upload'

const CompleteOrderModal = ({ call, isOpen, onClose }) => {
  const [showUploadForm, setShowUploadForm] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const { uploadPaymentDetails, patchOrder } = useApi()
  const { handlePayment, isSubmitting, order } = useStartFarm()

  const toast = useToast()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { payment_id: order?.payment, file: undefined },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true)
        let formData = new FormData()
        formData.append('bank_transfer_receipt', values.file)
        const res = await uploadPaymentDetails(values.payment_id, formData)
        await patchOrder(order._id, { status: 'PROCESSING' })
        resetForm({})
        toast({
          title: 'User successfully updated.',
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        setSuccess(true)
        sessionStorage.removeItem('my_farms')
        sessionStorage.removeItem('my_processing_orders')
        sessionStorage.removeItem('my_pending_orders')
        call()
      } catch (error) {
        toast({
          title: 'Error occured',
          description:
            error?.data?.message || 'Unexpected error, contact support',
          status: 'error',
          duration: 5000,
          position: 'top-right'
        })
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowUploadForm(false)
        setSuccess(false)
        onClose()
      }}
      size='xl'
      isCentered
    >
      <ModalOverlay />
      <ModalContent overflowY='scroll'>
        <ModalCloseButton />
        <ModalBody my={8} px={{ base: 6, md: 10 }}>
          {!success && (
            <Heading as='h4' fontSize={{ md: '2xl' }}>
              {showUploadForm
                ? 'Upload your payment receipt to complete your order'
                : 'Select an option'}
            </Heading>
          )}
          {!showUploadForm ? (
            <Flex mt={4} justify='space-between'>
              <Button
                btntitle='Pay with card'
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                py={{ base: 1, md: 7 }}
                leftIcon={<FiCreditCard size={22} />}
                onClick={_ => handlePayment(order?._id, order?.cost)}
                width='45%'
              />
              <Button
                btntitle='Upload payment slip'
                leftIcon={<FiUpload size={22} />}
                py={{ base: 1, md: 7 }}
                onClick={_ => setShowUploadForm(true)}
                width='45%'
              />
            </Flex>
          ) : success ? (
            <Box my='20px' mx={1} textAlign='center'>
              <Text>Thank you uploading your payment payslip</Text>
              <Text>Your order is now processing.</Text>
              <Text>
                Confirmation takes 1-2 weeks for us to get back to you.
              </Text>
            </Box>
          ) : (
            <Flex
              mt={4}
              flexDir='column'
              w='100%'
              align='center'
              justify='center'
            >
              <Upload
                w='100%'
                form={formik}
                field={{ name: 'file' }}
                accept=''
                mb={5}
              />
              <Button
                width='50%'
                type='submit'
                onClick={() => formik.handleSubmit()}
                py={{ base: 6, md: 7 }}
                btntitle='Upload document'
                isLoading={formik.isSubmitting}
                isDisabled={formik.isSubmitting}
                fontSize={{ md: 'lg' }}
              />
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

CompleteOrderModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  call: PropTypes.func
}

export default CompleteOrderModal
