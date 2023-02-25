import { Player, useAssetMetrics, useCreateAsset } from "@livepeer/react"

import { useCallback, useMemo, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"

const Videos = ({ handleChange }) => {
  const [video, setVideo] = useState(undefined)
  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }]
        }
      : null
  )
  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000
  })

  useEffect(() => {
    if (asset) {
      handleChange({
        target: {
          name: "video",
          value: asset[0]
        }
      })
    }
  }, [asset])

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": ["*.mp4"]
    },
    maxFiles: 1,
    onDrop
  })

  const isLoading = useMemo(
    () =>
      status === "loading" ||
      (asset?.[0] && asset[0].status?.phase !== "ready"),
    [status, asset]
  )

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === "failed"
        ? "Failed to process video."
        : progress?.[0].phase === "waiting"
        ? "Waiting..."
        : progress?.[0].phase === "uploading"
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === "processing"
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress]
  )
  console.log("asset", asset)

  return (
    <div>
      {!asset && (
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div>
              <p>Drag and drop or browse files</p>
            </div>
          </div>

          {error?.message && <p>{error.message}</p>}
        </div>
      )}

      {asset?.[0]?.playbackId && (
        <Player title={asset[0].name} playbackId={asset[0].playbackId} />
      )}

      <div>
        <div>
          {metrics?.metrics?.[0] && (
            <h2>Views: {metrics?.metrics?.[0]?.startViews}</h2>
          )}
          {video ? (
            <h2>{video.name}</h2>
          ) : (
            <p>Select a video file to upload.</p>
          )}
          {progressFormatted && <p>{progressFormatted}</p>}
        </div>
        {!asset?.[0].id && (
          <button
            onClick={() => {
              createAsset?.()
            }}
            disabled={isLoading || !createAsset}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  )
}

export default Videos
