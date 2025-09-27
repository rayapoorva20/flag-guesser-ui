export const FlagContainer = ({imageManager, code = 'IN'}) => {
    return (
    <img 
        onLoad={imageManager.onFetchComplete}
        onError={imageManager.onFetchError}
        key= {code} 
        src={`https://flagsapi.com/${code}/flat/64.png`}
    />)

}