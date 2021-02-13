export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Essa aplicação foi atualizada. ` +
      `Deseja atualizar para visualizar a nova versão?`
  )

  if (answer === true) {
    window.location.reload()
  }
}