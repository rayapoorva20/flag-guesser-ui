export const FlagContainer = ({imageManager, code = 'IN'}) => {
    return (
    <img 
        className="flag-image"
        onLoadStart={imageManager.onFetchStart}
        onLoad={imageManager.onFetchComplete}
        onError={imageManager.onFetchError}
        src={`https://flagsapi.com/${code}/flat/64.png`}
    />)

}