import axios from "axios";

// Usage note: use only in getServerSideProps/getStaticProps
export function serverApiRequest({ req }) { 
  return axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local", // nginx route: http://SERVICE_NAME.NAMESPACE.svc.cluster.local/...
    headers: req.headers // nginx requires to specify the host/domain (there may be several of them), also here I need the cookies from req.headers
  })
}